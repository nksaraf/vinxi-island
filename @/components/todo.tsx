import { useTodosTable } from "../brain/ui-react";
import { useBrain } from "../brain";

export function Listening() {
  const todos = useTodosTable();

  const brain = useBrain();
  console.log(todos);
  return (
    <div className="flex w-full items-center gap-2 p-4 py-3">
      <button
        aria-label="Pause timer"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-4 transition-colors hover:bg-[#694608]"
      >
        <div>
          <svg
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 fill-current text-amber-9"
          >
            <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z"></path>
          </svg>
        </div>
      </button>
      <button
        onClick={() => {
          brain.setModeValue("idle");
        }}
        aria-label="Exit"
        className="mr-12 flex h-8 w-8 items-center justify-center rounded-full bg-green-3 text-white transition-colors hover:bg-green-5"
      >
        {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg> */}
        <span className="icon-[ph--check-bold] text-green-10" />
      </button>
      <div className="flex items-baseline gap-1.5 text-[#FDB000]">
        <span
          className="text-lg font-semibold leading-none text-foreground"
          contentEditable
        >
          Do this task by today
        </span>
        <div className="relative overflow-hidden w-[64px] text-2xl font-light">
          0:
          <div className="inline-block tabular-nums">5</div>
          <div
            className="inline-block tabular-nums"
            // style="filter: blur(0px); opacity: 1; transform: translateY(-11.2591px) translateZ(0px);"
            data-motion-pop-id=":rt8:"
          >
            1
          </div>
        </div>
      </div>
    </div>
  );
}
