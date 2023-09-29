import React from 'react';
import {PagesType} from "../data/DataState";
import {useLocation, useParams} from "react-router-dom";
import {Error404} from "./Error404";

type PropsType = {
    pages: PagesType[]
}
export const Page = (props: PropsType) => {

    const params = useParams();
    console.log(params.id);
    let currentID = Number(params.id);
    let locale = useLocation();
    return (
        <>
            {locale.pathname==='/page/0' && <div>SECRET TEXT</div>}
            {props.pages[currentID]
                ? <>
                        <div>
                            {props.pages[currentID].heading}
                        </div>
                        <div>
                            {props.pages[currentID].about}
                        </div>
                    </>
                : <Error404 />
            }
        </>
    );
};