import { SpeedDial } from 'primereact/speeddial';

export const PictureItem = ({ pic, mode, handler }: any) => {
    const displayClasses = {
        small: 'w-1/5',
        medium: 'w-1/3',
        large: 'w-1/2',
    }

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                handler('add-tag', {pictureId: pic.ID})
            }
        },
      
    ];

    // @ts-ignore
    let displayClass = `flex ${displayClasses[mode]} flex-wrap`;

    return (
    <div className={displayClass}>
        {pic.Title}
        <SpeedDial model={items} direction="down" style={{}} />
        <div className="w-full p-1 md:p-2 bg-white rounded-md m-2">
            <img
                alt={pic.Title}
                className="block h-full w-full rounded-lg object-cover object-center "
                src={pic.Source} />
        </div>
    </div>)
}