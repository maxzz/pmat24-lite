import { fieldIcons } from "@/store/manifest/manifest-field-icons";

export function FieldIcon(isPsw: boolean | undefined, className: string) {
    const type = isPsw ? 'psw' : 'edit';
    const Icon = fieldIcons[type]?.({ className, title: `Field type: ${type}`, }) || <div className="text-red-500">NaN</div>;
    return Icon;
}
