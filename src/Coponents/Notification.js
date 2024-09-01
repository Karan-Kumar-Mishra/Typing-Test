import {  useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
export default function Notification(props) {
  const [open, setOpen] = useState(props.notify)

  
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-slate-400 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-slate-900 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="dark:bg-slate-900  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <p className="text-2xl font-extrabold  text-white">
                      <h1>
                         Wpm {(props.numberOfWord - props.incuurectWord)===NaN ? 0 : (props.numberOfWord - props.incuurectWord)} {" "}
                         Row {props.numberOfWord===NaN ?
                           0 : props.numberOfWord
                         }{" "}
                         Worng {" " + props.incuurectWord }
                       </h1>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
             
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md font-extrabold dark:bg-slate-800 px-3 py-2 text-sm  text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white hover:text-slate-900 sm:mt-0 sm:w-auto"
              >
                Retry
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}