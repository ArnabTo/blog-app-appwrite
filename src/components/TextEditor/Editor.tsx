'use client';
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

const QuillEditor = dynamic(() => import("react-quill"), { 
    ssr: false,
  loading: () => <p>Loading ...</p>
});

export default QuillEditor;