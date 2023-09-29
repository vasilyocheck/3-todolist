import React from 'react';
import styles from './Site.module.css'
import {PageTwo} from "./pages/PageTwo";
import {PageOne} from "./pages/PageOne";
import {PageThree} from "./pages/PageThree";
import {NavLink, Route, Routes, Navigate} from 'react-router-dom';
import {Error404} from "./pages/Error404";
import styled from "styled-components";
import {Page} from "./pages/Page";
import {dataState} from "./data/DataState";


function Page1() {
    return null;
}

export const Site = () => {
    return (
        <div>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                <div className={styles.nav}>
                    <NavWrapper><NavLink to={'/page/0'}> Page1 </NavLink> </NavWrapper>
                    <NavWrapper><NavLink  to={'/page/1'}> Page2 </NavLink> </NavWrapper>
                    <NavWrapper><NavLink  to={'/page/2'}> Page3 </NavLink> </NavWrapper>

                </div>
                <div className={styles.content}>
                    <Routes>

                        {/*<Route path={'/'} element={<Navigate to={'/page1'} />} />*/}
                        <Route path={'/page/:id'} element={<Page pages={dataState.pages} />} />
                        {/*<Route path={'/page2'} element={<PageTwo />} />
                        <Route path={'/page3'} element={<PageThree />} />*/}
                        {/*<Route path={'/*'} element={<Error404 />} />*/}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const NavWrapper = styled.div`
  margin-left: 10px;
  font-size: 20px;

  & > a {
    text-decoration: none;
    color: #1e3786;
  }

  & > a.active {
    text-decoration: none;
    color: #03eaff;
  }

  & > a:hover {
    color: steelblue; /* Цвет ссылки */
  }
`




/*
import React from 'react';
import styles from './Site.module.css'
import {PageTwo} from "./pages/PageTwo";
import {PageOne} from "./pages/PageOne";
import {PageThree} from "./pages/PageThree";
import {NavLink, Route, Routes, Navigate} from 'react-router-dom';
import {Error404} from "./pages/Error404";
import styled from "styled-components";


function Page1() {
    return null;
}

export const Site = () => {
    return (
        <div>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                <div className={styles.nav}>
                    <NavWrapper><NavLink to={'/page1'}> Page1 </NavLink> </NavWrapper>
                    <NavWrapper><NavLink  to={'/page2'}> Page2 </NavLink> </NavWrapper>
                    <NavWrapper><NavLink  to={'/page3'}> Page3 </NavLink> </NavWrapper>

                </div>
                <div className={styles.content}>
                    <Routes>

                        <Route path={'/'} element={<Navigate to={'/page1'} />} />
                        <Route path={'/page1'} element={<PageOne />} />
                        <Route path={'/page2'} element={<PageTwo />} />
                        <Route path={'/page3'} element={<PageThree />} />
                        <Route path={'/!*'} element={<Error404 />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const NavWrapper = styled.div`
  margin-left: 10px;
  font-size: 20px;

  & > a {
    text-decoration: none;
    color: #1e3786;
  }

  & > a.active {
    text-decoration: none;
    color: #03eaff;
  }

  & > a:hover {
    color: steelblue; /!* Цвет ссылки *!/
  }
`
*/
