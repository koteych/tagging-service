import { useState, useEffect } from "react";
import { Paginator } from 'primereact/paginator';
import { Chips } from 'primereact/chips';
import { PictureItem } from "./PictureItem";
import { InputSwitch } from "primereact/inputswitch";
import { PictureAddTagDialog } from './dialogs/add-tag'
import { PictureDeleteDialog } from './dialogs/delete-picture'
import axios from 'axios';
import './picture-list.css'

export default function () {
    const [value, setValue] = useState(['lineart', 'aesthetic']);
    const [displayMode, setDisplayMode] = useState<boolean>(false)
    const [pictures, setPictures] = useState([]);
    const [dialogFlag, setDialogFlag] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<string>("none");

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    function closeDialog() {
        setDialogFlag(false)
    }

    function openDialog() {
        setDialogFlag(true)
    }

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
                setDialogType('add-tag')
                openDialog();
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
                setDialogType('delete-picture')
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
        {(dialogType === 'add-tag') && <PictureAddTagDialog dialogFlag={dialogFlag} closeDialog={closeDialog} />}
        {(dialogType === 'delete-picture') && <PictureDeleteDialog options={{ pictureId: 1 }} dialogFlag={dialogFlag} closeDialog={closeDialog} />}

        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="card p-fluid w-1/2">
                <Chips value={value} onChange={(e) => { setValue(e.value as any); console.log(value) }} />
            </div>

            <div className="" style={{ textAlign: 'right' }}>
                <InputSwitch checked={displayMode} onChange={(e) => setDisplayMode(e.value)} />
            </div>

            <div className="-m-1 flex flex-wrap md:-m-2">
                {pictures.map((pic: any) => (
                    <PictureItem pic={pic} controlItems={items} />
                ))}

            </div>
            <Paginator first={first} rows={rows} totalRecords={120} onPageChange={onPageChange} />
        </div>
    </>;
}