import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ blog, onClick }) {
    return(
        <Card>
            <Link to={`/menu/${blog.id}`} >
                <CardImg width="100%" src={baseUrl + blog.image} alt={blog.name} />
                    {/* <CardImgOverlay> */}
                <CardTitle className="align-center">{blog.name}</CardTitle>
                    {/* //</CardImgOverlay> */}
            </Link>
        </Card>
    );
}

const Menu = (props) => {

    const menu = props.blogs.blogs.map((blog) => {
        return (
            <div key={blog.id} className="col-12 col-md-5 m-1">
               <RenderMenuItem blog={blog} />
            </div>
        );
    });


    if (props.blogs.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.blogs.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.blogs.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                        {menu}
                </div>
            </div>
        );
}

export default Menu;