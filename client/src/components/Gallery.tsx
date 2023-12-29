import { useState } from "react";
import { Paginator } from 'primereact/paginator';
import { Chips } from 'primereact/chips';
import { SpeedDial } from 'primereact/speeddial';
import { InputSwitch } from "primereact/inputswitch";
import './test.css'

export default function () {
    const [value, setValue] = useState(['lineart', 'aesthetic']);
    const [displayMode, setDisplayMode] = useState<boolean>(false)

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

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
                //toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
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

        {/* <TabsComponent /> */}

        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="card p-fluid w-1/2">
                <Chips value={value} onChange={(e) => { setValue(e.value as any); console.log(value) }} />
            </div>

            <div className="" style={{textAlign: 'right'}}>
                <InputSwitch checked={displayMode} onChange={(e) => setDisplayMode(e.value)} />
            </div>

            <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-1/3 flex-wrap">
                    <SpeedDial model={items} direction="down" style={{}} />
                    <div className="w-full p-1 md:p-2 bg-white rounded-md m-2 transition-transform duration-300 transform-gpu hover:scale-105">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center "
                            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
                    </div>
                </div>
                <div className="flex w-1/3 flex-wrap">
                    <SpeedDial model={items} direction="down" style={{}} />
                    <div className="w-full p-1 md:p-2  bg-white rounded-md m-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
                    </div>
                </div>
                <div className="flex w-1/3 flex-wrap">
                    <div className="w-full p-1 md:p-2  bg-white rounded-md m-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
                    </div>
                </div>
                <div className="flex w-1/3 flex-wrap">
                    <div className="w-full p-1 md:p-2  bg-white rounded-md m-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                    </div>
                </div>
                <div className="flex w-1/3 flex-wrap">
                    <div className="w-full p-1 md:p-2  bg-white rounded-md m-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp" />
                    </div>
                </div>
                <div className="flex w-1/3 flex-wrap">
                    <div className="w-full p-1 md:p-2  bg-white rounded-md m-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
                    </div>
                </div>
            </div>
            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div></>;
}