import dayjs from "dayjs";

type Props = {
  el: { id: string; created_at: string; name: string; content?: string }[];
};

const List = ({ el }: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {el.map((e) => (
        <li
          key={e.id}
          className="px-4 py-2 border-2 rounded-lg transition hover:scale-103"
        >
          <h4>{e.name}</h4>
          {e.content && <p>{e.content}</p>}
          <span>{dayjs(e.created_at).format("YYYY-MM-DD")}</span>
        </li>
      ))}
    </ul>
  );
};

export default List;
