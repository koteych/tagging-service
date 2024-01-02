import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { InputText } from "primereact/inputtext";
import axios from 'axios';

export const PictureAddTagDialog = ({ dialogFlag, closeDialog, options }: any) => {
    const [formData, setFormData] = useState({
        pictureId: 0,
        name: '',
        alias: '',
        desc: ''
    });

    const handleChange = (event: any) => {
        const { value } = event.target;
        setFormData({ ...formData, name: value })
    }

    const handleOk = () => {
        makeRequest();
        closeDialog()
    }

    const makeRequest = () => {
        axios.post(
            `api/pictures/add-tag`,
            {
                picture_id: options.pictureId,
                tag_name: formData.name,
                tag_alias: formData.alias,
                tag_desc: formData.desc,
            }
        )
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error sending request: ', error);
            });
    }

    return <>
        <Transition appear show={dialogFlag} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add new tag
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <span>Picture ID: {options.pictureId}</span>
                                    </p>
                                </div>


                                <div className="flex flex-col gap-2">
                                    <label htmlFor="tag-name">Tag name</label>
                                    <InputText id="tag-name" aria-describedby="tag-name" onChange={handleChange} />
                                    <small id="tag-name-help">
                                        Creates a new tag and adds it to a picture
                                    </small>
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeDialog}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleOk}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    </>
}