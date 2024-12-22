import { Button } from "../button";

export default function CustomButton({ message = "", className = "" }: { message: string, className: string }) {
    return <>
        <Button className={className}>{message}</Button>
    </>
}