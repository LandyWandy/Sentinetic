import '../css/style.css';
import pfp from '../images/BlankPFP.jpeg' 

function Tweet() {
   return(
    <div className='tweet'>
        <Avatar />
        <div className='content'>
            <NameWithHandle /><Time />
            <Message />
            <div className='buttons'>
                <CommentButton /> 
                <LikeButton />
                <RetweetButton />
                <ShareButton />
                
            </div>
        </div>
    </div>
   )
}

function Avatar() {
    return(
        <img
        src={pfp}
        className='avatar'
        alt='avatar'
        />
    )
}

function Message() {
    return(
        <div className='message'>
            OpenAI's language models rock!
        </div>
    )
}

function NameWithHandle() {
    return(
        <span className='name-with-handle'>
        <span className='name'>User</span>
        <span className='name'>@user12345</span>
        </span>
    )
}

const Time = () => (
    <span className='time'>6/30/23</span>
)

const LikeButton = () => (
    <i className='fa fa-heart like-button'/>
);
const CommentButton = () => (
    <i className='far fa-comment'/>
);
const RetweetButton = () => (
    <i className='fa fa-retweet retweet-button'/>
);
const ShareButton = () => (
    <i className='fas fa-external-link-alt'/>
);

export default Tweet;