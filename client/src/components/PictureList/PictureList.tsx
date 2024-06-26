import { useState, useEffect } from "react";
import { Paginator } from 'primereact/paginator';
import { Chips } from 'primereact/chips';
import { PictureItem } from "./PictureItem";
import { PictureAddTagDialog } from './dialogs/add-tag'
import { PictureDeleteDialog } from './dialogs/delete-picture'
import {DisplayModeSwitcher} from './DisplayModeSwitcher'
import axios from 'axios';
import './picture-list.css'

export type DisplayMode = "small" | "medium" | "large"

export default function () {
    const [tags, setTags] = useState(['hello']);
    const [displayMode, setDisplayMode] = useState<DisplayMode>("medium")
    const [pictures, setPictures] = useState([]);
    
    const [dialogFlag, setDialogFlag] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<string>("none");
    const [dialogOptions, setDialogOptions] = useState({});

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    function closeDialog() {
        setDialogFlag(false)
    }

    function openDialog() {
        setDialogFlag(true)
    }

    useEffect(() => {
        axios.post(`api/pictures/get-by-tag-names?page=${page}&pageSize=${pageSize}`, { tags: tags })
            .then(response => {
                setPictures(response.data.pictures || [])
                setTotal(response.data.total || 0);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [tags, page, pageSize]);

    const onPageChange = (event: any) => {
        console.log(event.page)
        setPage(event.page+1)
        setFirst(event.first);
        setRows(event.rows);
    };

    const showDialog = (dialogType: any, options: any) => {
        setDialogType(dialogType)
        setDialogOptions(options)
        openDialog();
    }

    return <>
        {(dialogType === 'add-tag') && <PictureAddTagDialog options={dialogOptions} dialogFlag={dialogFlag} closeDialog={closeDialog} />}
        {(dialogType === 'delete-picture') && <PictureDeleteDialog options={{ pictureId: 1 }} dialogFlag={dialogFlag} closeDialog={closeDialog} />}

        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
            <div className="card p-fluid w-1/2">
                <Chips value={tags} onChange={(e) => { setTags(e.value as any); }} />
            </div>

            <div className="" style={{ textAlign: 'right' }}>
                {/* <InputSwitch checked={displayMode} onChange={(e) => setDisplayMode(e.value)} /> */}
                <DisplayModeSwitcher mode={displayMode} handler={setDisplayMode}/>
            </div>

            <div className="-m-1 flex flex-wrap md:-m-2">
                {pictures.map((pic: any) => (
                    <PictureItem mode={displayMode} pic={pic} handler={showDialog}/>
                ))}

            </div>
            <Paginator first={(page-1)*pageSize} rows={pageSize} totalRecords={total} onPageChange={onPageChange} />
        </div>
    </>;
}