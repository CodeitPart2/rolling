import { useParams } from "react-router-dom";

function MessagePage() {
  const params = useParams();
  console.log(params.id);
  return (
    <div>
      <h1>롤링페이퍼에 메시지 추가</h1>
    </div>
  );
}

export default MessagePage;
