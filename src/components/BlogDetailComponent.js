import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Col, Button, Modal, ModalBody, ModalHeader, Label, Row  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(this.props.blogId, values.rating, values.author, values.comment);

   
}

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Add Comment</Button>
        <Modal className="mods" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>
          Add Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" defaultValue="1" className="form-control" name="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text model=".author" id="author" className="form-control" name="name" placeholder="Your Name"
                                validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}/>
                  <Errors className="text-danger" model=".author" show="touched"
                          messages={{
                            required: 'Required. ',
                            minLength: 'Must be greater than 2 characters. ',
                            maxLength: 'Must be 15 character or less. '
                          }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea model=".comment" id="message" rows="6" className="form-control" name="message" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}


function RenderBlog({blog}) {
    if (blog != null) {
        return(
          //<div className="col-12 col-md-5 m-1">
          <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                 <CardImg top width="100%" height="50%" src={baseUrl + blog.image} alt={blog.name} />
            <CardBody>
                <CardTitle>{blog.name}</CardTitle>
                <CardText>{blog.description}</CardText>
            </CardBody>
            </Card>
            </FadeTransform>
            //</div>
        );
    }
    else {
        return(
            <div></div>
        )
    }
}

function RenderComments({comments, postComment, blogId}) {
    if (comments == null || comments.length === 0) {
      return (
        <div></div>
      );
    }

    const renderedComments = comments.map((comment) => {
      return (
        <Fade in>
        <li>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
        </li>
        </Fade>
      );
    });

    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
          { renderedComments }
          </Stagger>
        </ul>
        <CommentForm blogId={blogId} postComment={postComment} />
      </div>
    );
  }

  const BlogDetail = (props) => {
    if(props.isLoading){
      return(
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    }
    else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
    }
    else if (props.blog != null) {
      return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Blogs</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.blog.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.blog.name}</h3>
                    <hr />
                </div>
            </div>
        <div className="row">
          <div className="row">
          <div className="col-12 col-md-12 m-1">
            <RenderBlog blog={props.blog} />
          </div>
          </div>
          <div className="row">
          <div className="col-12 col-md-12 m-1">
            <RenderComments comments={props.comments}
            postComment={props.postComment}
            blogId={props.blog.id} />
          </div>
          </div>
        </div>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }

export default BlogDetail;