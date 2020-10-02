import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './FollowButton.scss';
import { useDispatch, useSelector } from 'react-redux';

export const FollowButton = ({ user, requestFollow }) => {
  const dispatch = useDispatch();

  const { user: authUser } = useSelector(state => state.session);

  const [isHovered, setIsHovered] = useState(false);

  const isExist = !!user.followers.find(id => id === authUser.userId);
  const [btnText, setBtnText] = useState(btnTextConditions());

  const isSelfAccount = authUser.userId === user._id;

  function btnTextConditions() {
    if (!isHovered && isExist) {
      return 'Following';
    } else if (isHovered && isExist) {
      return 'Unfollow';
    } else if (!isExist) {
      return 'Follow';
    }
  }

  useEffect(() => {
    setBtnText(btnTextConditions());
  }, [isHovered, isExist]);

  const handleFollow = e => {
    dispatch(requestFollow(user.username, authUser.userId));
    setIsHovered(false);
  };

  return (
    <div className='empty-btn'>
      {!isSelfAccount && (
        <button
          className={classNames(
            'btn',
            { 'following-btn': !isHovered && isExist },
            { 'unfollow-btn': isHovered && isExist }
          )}
          onClick={handleFollow}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {btnText}
        </button>
      )}
    </div>
  );
};
