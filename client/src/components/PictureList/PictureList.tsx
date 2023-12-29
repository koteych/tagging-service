import { useState, useEffect, Fragment } from "react";
import { Paginator } from 'primereact/paginator';
import { Chips } from 'primereact/chips';
import { SpeedDial } from 'primereact/speeddial';
import { InputSwitch } from "primereact/inputswitch";
import { Dialog, Transition } from '@headlessui/react';
import { InputText } from "primereact/inputtext";
import axios from 'axios';
import './picture-list.css'

export default function () {
    const [value, setValue] = useState(['lineart', 'aesthetic']);
    const [displayMode, setDisplayMode] = useState<boolean>(false)
    const [pictures, setPictures] = useState([]);
    const [dialogFlag, setDialogFlag] = useState<boolean>(false);

    console.log(pictures)

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [data, setData] = useState([]);

    function closeDialog() {
        setDialogFlag(false)
    }

    function openDialog() {
        setDialogFlag(true)
    }

    useEffect(() => {
        axios.get('api/tags')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    useEffect(() => {
        axios.post('api/pictures/get-by-tag-names', { tags: ["hello"] })
            .then(response => {
                setPictures(response.data.pictures)
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                //toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                console.log('adding attempt')
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                //toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                openDialog();
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://react.dev/';
            }
        }
    ];

    return <>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="card p-fluid w-1/2">
                <Chips value={value} onChange={(e) => { setValue(e.value as any); console.log(value) }} />
            </div>

            <div className="" style={{ textAlign: 'right' }}>
                <InputSwitch checked={displayMode} onChange={(e) => setDisplayMode(e.value)} />
            </div>

            <div className="-m-1 flex flex-wrap md:-m-2">
                {pictures.map((pic: any) => (
                    <div className="flex w-1/3 flex-wrap">
                        {pic.Title}
                        <SpeedDial model={items} direction="down" style={{}} />
                        <div className="w-full p-1 md:p-2 bg-white rounded-md m-2">
                            <img
                                alt={pic.Title}
                                className="block h-full w-full rounded-lg object-cover object-center "
                                src={pic.Source} />
                        </div>
                    </div>
                ))}

            </div>
            <Paginator first={first} rows={rows} totalRecords={120} onPageChange={onPageChange} />
        </div>



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
                                    Confirm deletion
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete this picture?
                                    </p>
                                </div>


<div className="flex flex-col gap-2">
    <label htmlFor="tag-name">New tag name</label>
    <InputText id="tag-name" aria-describedby="tag-name" />
    <small id="tag-name-help">
        Creates a new tag and adds it to a picture
    </small>
</div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeDialog}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>




    </>;
}