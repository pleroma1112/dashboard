import { Container, Row, Col, Collapse } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useEffect, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({children}){

    return(
        <Container fluid>
            <Row>
                <Col className='p-0'>
                    <div className="vh-100 d-flex flex-row overflow-hidden">
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

function SideBar({children}){

    let sideWidth = useSelector(state=>state.layoutReducer.sideWidth)

    return(
        <div className="layout-sidebar bg-dark vh-100" style={{width : sideWidth}}>
            {children}
        </div>
    )
}

function SideBarLogo({children}){

    let headerHeight = useSelector(state=>state.layoutReducer.headerHeight)

    return(
        <div className="layout-sidebar-logo border-bottom border-secondary d-flex flex-row justify-content-center text-nowrap" style={{height : headerHeight}}>
            {children}
        </div>
    )
}

function SideBarUser({children}){
    return(
        <div className="layout-sidebar-user border-bottom border-secondary d-flex flex-row justify-content-center text-nowrap">
            {children}
        </div>
    )
}

function SideBarMenus({sideMenuConfig}){

    let headerHeight = useSelector(state=>state.layoutReducer.headerHeight)
    let [menuHeight,setMenuHeight] = useState('0px')

    useEffect(()=>{
        if(document.querySelector('.layout-sidebar-user')){
            let userHeight = document.querySelector('.layout-sidebar-user').offsetHeight
            setMenuHeight(`calc(100vh - ${headerHeight} - ${userHeight}px)`)
        }
    },[headerHeight])

    return(
        <div className="layout-sidebar-menus overflow-auto" style={{height : menuHeight}}>
            <OverlayScrollbarsComponent className='h-100'
                options={{className : 'os-theme-light'}}
            >
                {sideMenuConfig.map((config,i)=>(
                    <MenuButton key={i} name={config.name} path={config.path} tree={config.tree}/>
                ))}
            </OverlayScrollbarsComponent>
        </div>
    )
}

function MenuButton({name,path,tree}){

    let [collapse,setCollapse] = useState(false)
    let [menuActive,setMenuActive] = useState(false)
    let pathname = useLocation().pathname

    useEffect(()=>{
        path===pathname||(tree&&tree.find(config=>config.path===pathname))?setMenuActive(true):setMenuActive(false)
    },[pathname])

    return(
        <div className="sidebar-menu-btn">
            <Link to={path} className='text-decoration-none text-light'>
                <div className={"menu-btn rounded m-2 p-2 pl-3 pr-3 d-flex flex-row justify-content-between" + (menuActive?" bg-primary":"")} onClick={()=>{
                    setCollapse(!collapse)
                }}>
                    <div className="menu-name text-nowrap">
                        {name}
                    </div>
                    {tree&&tree.length>0?(
                        <div className={"menu-arrow d-flex justify-content-center align-items-center text-nowrap"} style={{transform : `rotateZ(${collapse?'-90deg':'0deg'})`}}>
                            <FaAngleLeft />
                        </div>
                    ):null}
                </div>
            </Link>
            {tree&&tree.length>0?(
                <Collapse in={collapse}>
                    <div className="menu-sub-list">
                        {tree.map((config,i)=>(
                            <Link to={config.path} key={i} className='text-decoration-none text-light'>
                                <div className={"sub-btn rounded mt-0 mb-1 ml-4 mr-2 p-2 pl-3 pr-3 text-nowrap" + (config.path===pathname?" bg-light text-dark":"")}>
                                    {config.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </Collapse>
            ):null}
        </div>
    )
}

function Content({children}){

    let sideWidth = useSelector(state=>state.layoutReducer.sideWidth)

    return(
        <div className="layout-content bg-light" style={{width : `calc(100% - ${sideWidth})`}}>
            {children}
        </div>
    )
}

function Header({children}){

    let headerHeight = useSelector(state=>state.layoutReducer.headerHeight)

    return(
        <div className="layout-header bg-white border-bottom overflow-hidden d-flex flex-row justify-content-between" style={{height : headerHeight}}>
            {children}
        </div>
    )
}

function LeftNav({children}){
    return(
        <div className='header-navitems-left d-flex flex-row'>
            {children}
        </div>
    )
}

function RightNav({children}){
    return(
        <div className='haeder-navitems-right d-flex flex-row'>
            {children}
        </div>
    )
}

function Main({children}){

    let headerHeight = useSelector(state=>state.layoutReducer.headerHeight)

    return(
        <div className="layout-main overflow-auto" style={{height : `calc(100% - ${headerHeight})`}}>
            <OverlayScrollbarsComponent className='h-100'>
                {children}
            </OverlayScrollbarsComponent>
        </div>
    )
}

function MainContent({children}){

    let footerHeight = useSelector(state=>state.layoutReducer.footerHeight)

    return(
        <div className="layout-main-content" style={{minHeight : `calc(100% - ${footerHeight})`}}>
            {children}
        </div>
    )
}

function MainFooter({children}){

    let footerHeight = useSelector(state=>state.layoutReducer.footerHeight)

    return(
        <div className="layout-footer bg-white border-top overflow-hidden d-flex flex-row justify-content-center" style={{height : footerHeight}}>
            {children}
        </div>
    )
}

Main.MainContent = MainContent
Main.MainFooter = MainFooter
Content.Main = Main
Header.LeftNav = LeftNav
Header.RightNav = RightNav
Content.Header = Header
SideBar.SideBarLogo = SideBarLogo
SideBar.SideBarUser = SideBarUser
SideBar.SideBarMenus = SideBarMenus
Layout.SideBar = SideBar
Layout.Content = Content

export default Layout