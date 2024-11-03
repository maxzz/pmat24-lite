import { ListViewV0 } from "./list-view-v0";
import { ListViewCo } from "./listview";

const testData = [
    { id: '1', content: 'Learn React fundamentals' },
    { id: '2', content: 'Build a todo list app' },
    { id: '3', content: 'Study React hooks in depth' },
    { id: '4', content: 'Explore state management solutions' },
    { id: '5', content: 'Learn about React Server Components' },
    { id: '6', content: 'Build a blog with Next.js' },
    { id: '7', content: 'Implement authentication in a React app' },
    { id: '8', content: 'Create a custom React hook' },
    { id: '9', content: 'Optimize React app performance' },
    { id: '10', content: 'Learn about React testing libraries' },
    { id: '11', content: 'Build a full-stack app with React and Node.js' },
    { id: '12', content: 'Explore React Native for mobile development' },
    { id: '13', content: 'Study advanced React patterns' },
    { id: '14', content: 'Contribute to an open-source React project' },
    { id: '15', content: 'Build a portfolio website with React' },
];

export function ListViewDemo() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">React Learning Roadmap</h1>
            <ListViewCo />
            <ListViewV0 items={testData} />
        </div>
    );
}