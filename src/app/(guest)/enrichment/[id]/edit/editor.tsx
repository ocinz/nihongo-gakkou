"use client"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


const FormSchema = z.object({
    content: z.string({ required_error: "Please write something." }),
    userId: z.string({ required_error: "user not found." }),
    title: z.string({ required_error: "Please write something." }),
    id: z.number({ required_error: "Enrichment ID is Missing." }),
})
import { toast } from "@/hooks/use-toast"
import { navigate, updateEnrichment, } from "../../actions"
import { Enrichment } from "../detail/preview"
export default function Editor({ enrichment }: { enrichment: Enrichment }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userId: enrichment?.userId,
            id: enrichment?.id,
            title: enrichment?.title,
            content: enrichment?.content,
        }
    })

    useEffect(() => {
        form.setValue("content", enrichment?.content ?? "")
        form.setValue("userId", enrichment?.userId ?? "")
        form.setValue("id", enrichment?.id ?? 0)
        form.setValue("title", enrichment?.title ?? "")
    }, [enrichment, form])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await updateEnrichment(data)
            toast({
                title: "Submission successful",
                description: "Redirecting..."
            })
            await navigate("/enrichment")
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
    return <div className=" mx-8">
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

    </div>
}