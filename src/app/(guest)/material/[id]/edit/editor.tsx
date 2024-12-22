"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const levels = ["N1", "N2", "N3", "N4", "N5"] as const

const FormSchema = z.object({
    content: z.string({ required_error: "Please write something." }),
    level: z.enum(levels, {
        required_error: "Please select a level.",
    }),
    userId: z.string({ required_error: "user not found." }),
    title: z.string({ required_error: "Please write something." }),
    id: z.number({ required_error: "Material ID is Missing." }),
})
import { toast } from "@/hooks/use-toast"
import { navigate, updateMaterial, } from "../../actions"
import { Material } from "@prisma/client"
export default function Editor({ material }: { material: Material | null }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userId: material?.userId,
            id: material?.id,
            title: material?.title,
            content: material?.content,
            level: material?.level,

        }
    })

    useEffect(() => {
        form.setValue("content", material?.content ?? "")
        form.setValue("userId", material?.userId ?? "")
        form.setValue("id", material?.id ?? 0)
        form.setValue("title", material?.title ?? "")
        form.setValue("level", material?.level ?? "N5")
    }, [material, form])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await updateMaterial(data)
            toast({
                title: "Submission successful",
                description: "Redirecting..."
            })
            await navigate("/material")
        } catch (error) {
            toast({
                title: "Submission failed",
                description: "Please try again.",
            })
            console.log(JSON.stringify(error))
        }
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']                                         // remove formatting button
        ]
    }
    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Judul</FormLabel>
                            <FormControl>
                                <Input value={form.getValues("title")} onChange={(e) => form.setValue("title", e.target.value)} type="title" name="title" placeholder="Judul" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Level</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? levels.find((level) => level == field.value)
                                                : "Select level"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search level..." />
                                        <CommandList>
                                            <CommandEmpty>No level found.</CommandEmpty>
                                            <CommandGroup>
                                                {levels.map((level) => (
                                                    <CommandItem
                                                        value={level}
                                                        key={level}
                                                        onSelect={() => {
                                                            form.setValue("level", level)
                                                        }}
                                                    >
                                                        {level}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                level === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>
                                Content
                            </FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={(e) => {
                                        form.setValue("content", e)
                                    }}
                                    className=" "
                                    placeholder="Type here"
                                    modules={modules}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>

    </>
}