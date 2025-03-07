'use client';

import s from './PostContentSkeleton.module.scss';

export default function PostContentSkeleton() {
  return (
    <div className={s.postContainer}>
      <div className={s.postImg}>
        <div className={s.image}></div>
      </div>
      <div className={s.postContent}>
        <div className={s.wrapper}>
          <div className={s.header}>
            <div className={s.postOwner}>
              <div className={s.profileAvatar}></div>
              <div className={s.userName}></div>
            </div>
            <div className={s.postModalMenu}></div>
          </div>
          <div className={s.coments}>
            <div className={s.coment}></div>
            <div className={s.coment}></div>
            <div className={s.coment}></div>
          </div>
          <div className={s.interactionPanel}>
            <div className={s.interactionBlock}>
              <div className={s.interaction}>
                <div className={s.iconsGroup}>
                  <div className={s.icon} />
                  <div className={s.icon} />
                </div>
                <div className={s.icon} />
              </div>
              <div className={s.postLikes}></div>
              <div className={s.data}></div>
            </div>
            <div className={s.addComent}>
              <input className={s.input} />
              <div className={s.button}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
