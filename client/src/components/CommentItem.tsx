import { IComment } from '../types/comment';

interface ICommentItemProps {
  cmt: IComment;
}

export const CommentItem = ({ cmt }: ICommentItemProps) => {
  const avatar = cmt.author?.trim().toUpperCase().split('').slice(0, 2);

  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {avatar}
      </div>
      <div className="flex flex-col">
        <div className={`lex text-xs ${cmt.author === 'ucitel'?'text-red-500':'text-green-500'}`}>{cmt.author}: </div>
        <div className="flex text-black text-[14px]">{cmt.comment}</div>
      </div>
    </div>
  );
};
