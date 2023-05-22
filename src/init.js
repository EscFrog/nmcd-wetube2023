import "./db";  // 파일을 임포트하면 즉시 실행된다.
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`)
app.listen(PORT, handleListening);  // express를 시작하고 본격적으로 대기 상대로 만든다.