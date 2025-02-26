import { ReactNode, RefObject } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";
import { useDebouncedCallback } from "use-debounce";

function Dialog(
  { title, children, show }: {
    title: string;
    children: ReactNode;
    show: boolean;
  },
) {
  const ref = useRef<HTMLDialogElement>();
  const debounced = useDebouncedCallback(
    (value) => {
      if (value) {
        ref.current?.showModal();
      }
    },
    1000,
  );

  useEffect(() => {
    debounced(show);
  }, [show]);

  return (
    <dialog className="modal" ref={ref as RefObject<HTMLDialogElement>}>
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="py-4">
          {children}
        </div>
      </div>
    </dialog>
  );
}

export { Dialog };
