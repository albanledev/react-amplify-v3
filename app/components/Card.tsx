type Props = {
  title: string;
  content: string;
  onClick?: () => void;
};

const Card = ({ title, content, onClick }: Props) => (
  <>
    <div
      className="border-2 rounded-lg bg-white p-6 flex flex-col justify-center cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <h2 className="text-black">{title}</h2>
      <p className="text-black text-center font-bold">{content}</p>
    </div>
  </>
);

export default Card;
