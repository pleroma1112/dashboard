import { Routes, Route } from 'react-router-dom'
import Layout from './dashboard-layout/Layout'
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaPlus } from 'react-icons/fa'
import sideMenus from '../pages/sideMenu'
import routes from '../pages/routes';
import api from '../models/api';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MENUS, SET_SIDE_WIDTH } from '../reducers/layoutReducer';
import { saveAs } from 'file-saver'
import { Button, Card, Form, FormControl, InputGroup, Modal, OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { LOADDATA } from '../reducers/widgetReducer';
import { useState } from 'react';
import { useEffect } from 'react';
import GridPage from '../pages/GridPage';

function DashBoard(){

    let sideWidth = useSelector(state=>state.layoutReducer.sideWidth)
    let menus = useSelector(state=>state.layoutReducer.sideMenus)
    let store = useSelector(state=>state)
    let [show, setShow] = useState(false)
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch({type : SET_MENUS, value : sideMenus})
    },[])

    return(
        // Layout -> display : flex, flex-direction : row
        <Layout>

            {/* SideBar*/}
            <Layout.SideBar>

                {/* Logo */}
                <Layout.SideBar.SideBarLogo>
                    <div className='align-self-center'>
                        <h3 className='text-light m-auto'>WON-ONE <span className='font-weight-light'>TECH</span></h3>
                    </div>
                </Layout.SideBar.SideBarLogo>

                {/* User */}
                <Layout.SideBar.SideBarUser>
                    <div className='ml-3'>
                        <h1><FaUserCircle className='align-self-center text-light'/></h1>
                    </div>
                    <div className="flex-grow-1 align-self-center text-center">
                        <h3 className='m-auto text-light font-weight-light'>User</h3>
                    </div>
                </Layout.SideBar.SideBarUser>

                {/* Side Menus */}
                <Layout.SideBar.SideBarMenus sideMenuConfig={menus||[]} />

            </Layout.SideBar>

            {/* Content */}
            <Layout.Content>

                {/* Header */}
                <Layout.Content.Header>

                    {/* Left Navigation Menus */}
                    <Layout.Content.Header.LeftNav>
                        <div className="nav-item d-flex flex-row ml-3" style={{cursor : 'pointer'}} onClick={()=>{
                            if(sideWidth!=='0px'){
                                dispatch({type : SET_SIDE_WIDTH, value : '0px'})
                            }else{
                                dispatch({type : SET_SIDE_WIDTH, value : '250px'})
                            }
                        }}>
                            <h5 className='font-weight-light align-self-center'><FaBars className='mr-3'/>|</h5>
                        </div>
                        <Link to="/" className="text-decoration-none text-dark align-self-center ml-3">
                            <div className="nav-item">
                                <h5 className="font-weight-light"><span className="mr-3">Home</span>|</h5>
                            </div>
                        </Link>
                        <div className="nav-item align-self-center ml-3" style={{cursor : 'pointer'}} onClick={()=>setShow(true)}>
                            <h5 className='font-weight-light text-muted'>
                                Menus
                                <span className='ml-3'>|</span>
                            </h5>
                        </div>
                    </Layout.Content.Header.LeftNav>

                    {/* Rgiht Navigation Menus */}
                    <Layout.Content.Header.RightNav>
                        <div className="nav-item align-self-center mr-3 d-flex flex-row" style={{cursor : 'pointer'}} onClick={()=>{
                            document.querySelector('.load-store-data').click()
                        }}>
                            <Form className='d-none'>
                                <Form.Control className='load-store-data' type='file' onChange={(e)=>{
                                    let file = e.target.files[0]
                                    let reader = new FileReader()
                                    reader.onload = (e)=>{
                                        let store = JSON.parse(e.target.result)
                                        dispatch({type : LOADDATA, value : store.widgetReducer.widgetData})
                                        dispatch({type : SET_MENUS, value : store.layoutReducer.sideMenus})
                                    }
                                    reader.readAsText(file)
                                }}/>
                            </Form>
                            <h5 className='font-weight-light text-muted'>
                                <span className='mr-3'>|</span>
                                Load
                            </h5>
                        </div>
                        <div className="nav-item align-self-center mr-3" style={{cursor : 'pointer'}} onClick={()=>{
                            console.log(store)
                            saveAs(new Blob([JSON.stringify(store)],{type : 'application/json'}),'dashboard-data.json')
                        }}>
                            <h5 className='font-weight-light text-muted'>
                                <span className='mr-3'>|</span>
                                Save
                            </h5>
                        </div>
                        <Link to="/" className="text-decoration-none text-muted align-self-center mr-3">
                            <div className="nav-item">
                                <h5 className="font-weight-light" onClick={()=>{
                                    api.logout().then(result=>window.location.href = '/')
                                }}><span className='mr-3'>|</span>Logout</h5>
                            </div>
                        </Link>
                    </Layout.Content.Header.RightNav>

                </Layout.Content.Header>

                {/* Main */}
                <Layout.Content.Main>

                    {/* Main Content */}
                    <Layout.Content.Main.MainContent>
                        <Routes>
                            {routes.map((val,i)=>(
                                <Route key={i} path={val.path} element={<val.page/>}/>
                            ))}
                            {menus&&menus.length>0?(
                                menus.map((menu,i)=>(
                                    menu.tree.length===0?(
                                        <Route key={i*10000} path={menu.path} element={<GridPage id={`grid${menu.path}`}/>}/>
                                    ):(
                                        menu.tree.map((sub,j)=>(
                                            <Route key={j*1000} path={sub.path} element={<GridPage id={`grid${sub.path}`}/>} />
                                        ))
                                    )
                                ))
                            ):null}
                        </Routes>
                    </Layout.Content.Main.MainContent>

                    {/* Footer */}
                    <Layout.Content.Main.MainFooter>
                        <strong className="text-nowrap align-self-center">Copyright © <a href="http://won-one.com/">WON-ONE TECH</a></strong>
                    </Layout.Content.Main.MainFooter>

                </Layout.Content.Main>

            </Layout.Content>

            {menus.length>0?(
                <MenusConfig show={show} onHide={(value)=>setShow(value)}/> 
            ):null}

        </Layout>
    )
}

function MenusConfig({show,onHide}){

    let sideMenus = useSelector(state=>state.layoutReducer.sideMenus)
    let [menus, setMenus] = useState(sideMenus)
    let dispatch = useDispatch()

    return(
        <Modal size='lg' show={show} onHide={()=>{
            let close = window.confirm('저장하지 않고 닫으시겠습니까?')
            if(close){
                setMenus(sideMenus)
                onHide(false)
            }
        }} onShow={()=>setMenus(sideMenus)} enforceFocus={false}>
            <Modal.Header closeButton>
                <Modal.Title className='mb-0 font-weight-light'>
                    Menus Configuration
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Header className='d-flex flex-row justify-content-between align-items-center'>
                        <Card.Title className='mb-0 font-weight-light'>
                            Menu List
                        </Card.Title>
                        <Button size='sm' className='d-flex align-items-center p-1' onClick={()=>(
                            setMenus(menus.concat({name:'',path:'',tree:[]}))
                        )}>
                            <FaPlus />
                        </Button>
                    </Card.Header>
                    <Card.Body className='p-0'>
                        <Table size='sm' className='mb-0' borderless striped hover>
                            <thead className='thead-dark border-bootom'>
                                <tr>
                                    {Object.keys(menus[0]).map((val,i)=>(
                                        <th key={i} className='text-center'>{val}</th>
                                    ))}
                                    <th className='text-center'>option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menus.map((route,i)=>(
                                    <tr key={i}>
                                        {Object.values(route).map((val,j)=>(
                                            <td key={j}>
                                                {!Array.isArray(val)?(
                                                    <Form>
                                                        <Form.Control size='sm' type='text' value={val} onChange={(e)=>(
                                                            setMenus(menus.reduce((p,c,idx)=>{
                                                                if(idx===i){
                                                                    c[Object.keys(c)[j]] = e.target.value
                                                                }
                                                                return p.concat(c)
                                                            },[]))
                                                        )}/>
                                                    </Form>
                                                ):(
                                                    <OverlayTrigger trigger='click' placement='bottom' overlay={
                                                        <Popover>
                                                            <Popover.Title as='h3' className='d-flex flex-row justify-content-between align-items-center p-1'>
                                                                Sub Menus Configuration
                                                                <Button size='sm' className='d-flex align-items-center p-1' onClick={()=>(
                                                                    setMenus(menus.reduce((p,c,idx)=>{
                                                                        if(idx===i){
                                                                            c.tree = c.tree.concat({name : '', path : ''})
                                                                        }
                                                                        return p.concat(c)
                                                                    },[]))
                                                                )}>
                                                                    <FaPlus/>
                                                                </Button>
                                                            </Popover.Title>
                                                            <Popover.Content className='p-0'>
                                                                <Table size='sm' className='mb-0' borderless striped hover>
                                                                    <thead className='thead-dark border-bootom'>
                                                                        <tr>
                                                                            {['name','path'].map((th,k)=>(
                                                                                <th key={k} className='text-center'>{th}</th>
                                                                            ))}
                                                                            <th className='text-center'>option</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody> 
                                                                        {route.tree.map((sub,l)=>(
                                                                            <tr key={l}>
                                                                                {Object.values(sub).map((prop,m)=>(
                                                                                    <td key={m}>
                                                                                        <Form>
                                                                                            <Form.Control size='sm' type='text' value={prop} onChange={(e)=>(
                                                                                                setMenus(menus.reduce((p,c,idx)=>{
                                                                                                    if(idx===i){
                                                                                                       c.tree[l][Object.keys(sub)[m]] = e.target.value 
                                                                                                    }
                                                                                                    return p.concat(c)
                                                                                                },[]))
                                                                                            )}/>
                                                                                        </Form>
                                                                                    </td>
                                                                                ))}
                                                                                <td>
                                                                                    <Button size='sm' variant='danger' onClick={()=>(
                                                                                        setMenus(menus.reduce((p,c,idx)=>{
                                                                                            if(idx===i){
                                                                                                c.tree = c.tree.reduce((pre,cur,index)=>{
                                                                                                    if(index===l){
                                                                                                        return pre
                                                                                                    }
                                                                                                    return pre.concat(cur)
                                                                                                },[])
                                                                                            }
                                                                                            return p.concat(c)
                                                                                        },[]))
                                                                                    )}>Delete</Button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </Popover.Content>
                                                        </Popover>
                                                    }>
                                                        <Button size='sm' variant='info' className='w-100'>Set</Button>
                                                    </OverlayTrigger>
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            <Button size='sm' variant='danger' className='w-100' onClick={()=>(
                                                setMenus(menus.reduce((p,c,idx)=>idx===i?p:p.concat(c),[]))
                                            )}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>{
                    dispatch({type : SET_MENUS, value : menus})
                    onHide(false)
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DashBoard