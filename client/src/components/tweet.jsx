import '../css/style.css';
import pfp from '../images/BlankPFP.jpeg';

function Tweet({ tweet }) {
    if (!tweet) {
        return <div></div>; // replace this with a loading spinner or any loading UI
    }
   return (
    <div className='tweet'>
        <Avatar />
        <div className='content'>
            <NameWithHandle /><Time createdAt={tweet.createdAt}/>
            <Message text={tweet.text}/>
            <div className='buttons'>
                <CommentButton comments={tweet.comments}/> 
                <LikeButton likes={tweet.likes}/>
                <RetweetButton retweets={tweet.retweets}/>
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

function Message({ text }) {
    return(
        <div className='message'>
            {text}
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

function Time({ createdAt }) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // default formatting
    return <span className='time'>{formattedDate}</span>;
}

const LikeButton = ({ likes }) => (
    <span>
    {likes} <i className='fa fa-heart like-button'/> 
    </span>
);
const CommentButton = ({ comments }) => (
    <span>
    {comments} <i className='far fa-comment'/>
    </span>
);
const RetweetButton = ({ retweets }) => (
    <span>
    {retweets} <i className='fa fa-retweet retweet-button'/>
    </span>
);
const ShareButton = () => (
    <i className='fas fa-external-link-alt'/>
);

export default Tweet;
