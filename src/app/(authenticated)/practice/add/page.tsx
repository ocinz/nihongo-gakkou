"use client"
// import { toast } from "@/hooks/use-toast"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// const FormSchema = z.object({
//     name: z.string().nonempty(),
//     level: z.string().nonempty(),
//     questions: z.array(z.object({
//         question: z.string().nonempty(),
//         answers: z.array(z.string().nonempty()),
//         trueAnswer: z.string().nonempty()
//     }))
// })

export default function Page() {
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    //     defaultValues: {
    //         name: "",
    //         level: "",
    //         questions: [{ question: "", answers: ["", "", "", ""], trueAnswer: "" }]
    //     },
    // })
    // const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //     try {
    //         await create(data);
    //         toast({
    //             title: "Practice berhasil dibuat",
    //             description: (
    //                 <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //                     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //                 </pre>
    //             ),
    //         });
    //     } catch (error) {
    //         console.error("Error creating menu:", error);
    //         toast({
    //             title: "Terjadi kesalahan",
    //             description: "Gagal membuat menu. Silakan coba lagi.",
    //             variant: "destructive",
    //         });
    //     }
    // };
    return <>
        Add Practice Page
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Level:
                <input type="text" name="name" />
            </label>
            tabel
            <h1> pertanyaan 1</h1>
            <h1> Jawaban</h1>
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
            </ul>
            <h2>
                true answer: drop down [A, B, C, D]
            </h2>
            <button type="submit">Add</button>
        </form>
    </>

}
