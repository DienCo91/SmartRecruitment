// components/CustomToast.tsx
import { toast } from 'sonner';

type CustomToastProps = {
  t: string | number;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
};

export function CustomToast({ t, title, message, icon }: CustomToastProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg border-l-4 border-blue-500">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
        {icon ?? '💬'}
      </div>

      <div className="flex flex-col">
        <p className="font-semibold text-gray-800">{title ?? 'Notification'}</p>
        <p className="text-sm text-gray-600">{message ?? ''}</p>
      </div>

      <button
        onClick={() => toast.dismiss(t)}
        className="ml-auto text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  );
}
