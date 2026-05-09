import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Tree from './components/Tree.jsx'
import Modal from './components/Modal.jsx'
import projects from './data/projects.json'

export default function App() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <div className="page">
      <Header />

      <main className="tree-stage">
        <Tree projects={projects} onLeafClick={setActiveProject} />
      </main>

      {activeProject && (
        <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </div>
  )
}
