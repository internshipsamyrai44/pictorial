'use client';

import s from './PostContent.module.scss';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import PostHeader from './postHeader/PostHeader';
import AddComentForm from './addComentForm/AddComentForm';
import InteractionBlock from './interactionBlock/InteractionBlock';
import ComentItem from './comentItem/ComentItem';

type Props = {
  post: PublishedPostResponse;
};

export default function PostContent({ post }: Props) {
  return (
    <div className={s.wrapper}>
      <PostHeader avatarOwner={post.avatarOwner} userName={post.userName} />
      <div className={s.сonversation}>
        <div className={s.description}>
          <ComentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} descriptionPost />
        </div>
        <div className={s.coments}>
          <ComentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
          <ComentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
        </div>
      </div>
      <div className={s.interactionPanel}>
        <InteractionBlock post={post} />
        <AddComentForm />
      </div>
    </div>
  );
}
