import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import BlogDetail from './BlogDetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchBlogs , fetchComments, fetchPromos  } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import CarouselComp from './CarouselComponent';
//import { form } from 'form-data';

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (blogId, rating, author, comment) => dispatch(postComment(blogId, rating, author, comment)),
  fetchBlogs: () => { dispatch(fetchBlogs())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
});

class Main extends Component {

  // constructor(props) {
  //   super(props);
    
  // }  

  componentDidMount() {

    this.props.fetchBlogs();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
        return(
          <Home 
          blog={this.props.blogs.blogs.filter((blog) => blog.featured)[0]}
          blogsLoading={this.props.blogs.isLoading}
          blogsErrMess={this.props.blogs.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
          />
        );
    }

    const BlogWithId = ({match}) => {
      return(
        <BlogDetail blog={this.props.blogs.blogs.filter((blog) => blog._id === parseInt(match.params.blogId,10))[0]}
        isLoading={this.props.blogs.isLoading}
        errMess={this.props.blogs.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.blogId === parseInt(match.params.blogId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path="/aboutus" component={ () => <About leaders={this.props.leaders} /> } />
              <Route exact path='/menu' component={() => <Menu blogs={this.props.blogs} />} />
              <Route path="/menu/:blogId" component={BlogWithId} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Redirect to="/home" />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));