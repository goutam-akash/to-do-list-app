// pages/index.tsx in Next.js
import { GetServerSideProps } from 'next';
import { Todo } from './interfaces/Todo';
import TodoItem from './components/todo-item';

const Home = ({ todos }: { todos: Todo[] }) => {
  return (
    <html>
      <body>
    <div>
      <h1>To-do List</h1>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggleComplete={function (id: number, task_name: string): void {
                throw new Error('Function not implemented.');
            } } onDelete={function (id: number): void {
                throw new Error('Function not implemented.');
            } } onEdit={function (id: number, newText: string): void {
                throw new Error('Function not implemented.');
            } } />
        ))}
      </div>
     
      {/* Add new todo here */}
    </div>
    </body>
    </html>
  );
};

// Using SSG to prerender the page with the todo list
export async function getStaticProps() {
  const res = await fetch('https://yourapi.com/api/todos');
  const todos = await res.json();

  return {
    props: { todos }, // This will be used to prerender the page
    revalidate: 10, // Optional: Revalidate every 10 seconds to keep the data fresh
  };
}

export default Home;
