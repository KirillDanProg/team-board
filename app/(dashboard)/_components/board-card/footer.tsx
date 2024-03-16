interface Props {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
}
const Footer = ({ authorLabel, createdAtLabel, isFavorite, title }: Props) => {
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate m-w-[calc(100% - 20px)]">{title}</p>
      <p className="opacity-0 group-hover:opacity-80 transition-opacity text-[11px] text-muted-foreground ">
        {authorLabel}, {createdAtLabel}
      </p>
    </div>
  );
};

export default Footer;
