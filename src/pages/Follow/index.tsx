import { checkSentFollow, checkReceivedFollow } from 'api/follow';
import search from 'assets/svg/search/lens.svg';
import { GetFollowListResponse, SentOrReceivedFollowResponse } from 'api/follow/entity';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import cn from 'utils/ts/classNames';
import style from './index.module.scss';
import FailToSearch from './components/FailToSearch';
import SearchPage from './components/SearchPage';
import FollowList from './components/FollowList';
import { FollowerInfo } from './static/entity';
import EmptyFriend from './components/EmptyFriend';
import useSearchFriend from './hooks/useSearchFriend';
import useSentOrReceivedFollow from './hooks/useSentOrReceivedFollow';
import useGetFollowList from './hooks/useGetFollowList';
import useGetRecentlyActiveFollower from './hooks/useGetRecentlyActiveFollower';

// user : 팔로우 요청을 받은 사람
// follower : 팔로우를 요청한 사람
// requestId : 팔로우 수락 혹은 거절을 할 때 사용됨, 유저의 id가 아닌 받은 요청이나 보낸 요청의 id값
const filterSendOrReceiveInfo = (
  data: SentOrReceivedFollowResponse,
  isReceive: boolean,
): FollowerInfo[] => {
  const filteredData: FollowerInfo[] = data.content.map((item) => ({
    account: isReceive ? item.user.account : item.follower.account,
    id: isReceive ? item.user.id : item.follower.id,
    key: isReceive ? item.user.id : item.follower.id,
    followedType: isReceive ? 'REQUEST_RECEIVE' : 'REQUEST_SENT',
    nickname: isReceive ? item.user.nickname : item.follower.nickname,
    userType: isReceive ? item.user.userType : item.follower.userType,
    requestId: item.id,
  }));
  return filteredData;
};

const filterFollowInfo = (data: GetFollowListResponse): FollowerInfo[] => {
  const filteredData: FollowerInfo[] = data.content.map((item) => ({
    account: item.account,
    email: item.email,
    id: item.id,
    nickname: item.nickname,
    userType: item.userType,
    followedType: 'FOLLOWED',
    userCountResponse: item.userCountResponse,
  }));
  return filteredData;
};

export default function FollowPage() {
  const { keyword, handleInputChange, user } = useSearchFriend();
  const { data: receive } = useSentOrReceivedFollow('received', checkReceivedFollow);
  const { data: sent } = useSentOrReceivedFollow('sent', checkSentFollow);
  const { data: follower } = useGetFollowList();
  const { data: recent } = useGetRecentlyActiveFollower();
  return (
    <div className={style.template}>
      <div className={style.content}>
        <div className={style.top}>
          <div className={style.top__prev}>
            <PreviousButton />
            <p>친구 목록</p>
          </div>
          <div className={style.top__search}>
            <input
              type="text"
              className={cn({ [style['top__search--input']]: true })}
              placeholder="검색어를 입력해주세요."
              onChange={handleInputChange}
              value={keyword}
            />
            <img className={cn({ [style['top__search--img']]: true })} src={search} alt="search" />
          </div>
        </div>
        {keyword.length === 0
        && (
          follower?.content.length === 0
            && sent?.content.length === 0
            && receive?.content.length === 0 ? <EmptyFriend />
            : (
              <div className={style.container}>
                {recent && <FollowList title="최근 접속한 친구" data={filterFollowInfo(recent.data)} />}
                {follower && <FollowList title="모든 친구" data={filterFollowInfo(follower)} />}
                {receive && sent && <FollowList title="친구 신청" data={filterSendOrReceiveInfo(receive, true)} sent={filterSendOrReceiveInfo(sent, false)} />}
              </div>
            )
        )}
        {user && keyword.length > 0 && (user.content.length > 0
          ? (
            <div>
              <SearchPage data={user.content} />
              {follower && <FollowList title="모든 친구" data={filterFollowInfo(follower)} />}
            </div>
          ) : <FailToSearch />)}
      </div>
    </div>
  );
}
