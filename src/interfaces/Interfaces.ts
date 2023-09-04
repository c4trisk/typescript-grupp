interface User {
	id: number;
	name: string;
	userName: string;
}

type ThreadCategory = "THREAD" | "QNA"

interface Thread {
  id: number;
	title: string;
	category: ThreadCategory;
	creationDate: string;
	description: string;
	creator: User;
	comments: Comment[];
}

interface QNAThread extends Thread {
	category: "QNA";
	isAnswered: boolean;
	commentAnswerId?: number
}

interface Comment {
	id: number; //(tillagt)
	thread: number;
	content: string;
	creator: User
}

export type { User, ThreadCategory, Thread, QNAThread, Comment }