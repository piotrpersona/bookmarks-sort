import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Button, Select, TreeSelect } from 'antd';
import 'antd/dist/reset.css';

const App: FC = () => {
  useEffect(() => {
    getBookmarksTree()
  });

  const [value, setValue] = useState<string>();
  const [bookmarks, setBookmarks] = useState<string>();

  const handleSelectSortBy = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleSelectBookmarks = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  }

  const getBookmarksTree = () => {
    chrome.bookmarks.getTree((nodes: chrome.bookmarks.BookmarkTreeNode[]) => {
      console.log(nodes)
      // console.log('hehrehrhe', nodes);
      //   nodes.forEach((node: chrome.bookmarks.BookmarkTreeNode) => {
      //     sortRecursive(node.id)
      // })
    })
  }

  const treeData = [
    {
      value: 'parent 1',
      title: 'parent 1',
      children: [
        {
          value: 'parent 1-0',
          title: 'parent 1-0',
          children: [
            {
              value: 'leaf1',
              title: 'my leaf',
            },
            {
              value: 'leaf2',
              title: 'your leaf',
            },
          ],
        },
        {
          value: 'parent 1-1',
          title: 'parent 1-1',
          children: [
            {
              value: 'sss',
              title: <b style={{ color: '#08c' }}>sss</b>,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="App">
      <Select
        defaultValue="title"
        style={{ width: 200 }}
        onChange={handleSelectSortBy}
        options={[
          { value: 'title', label: 'title' },
          { value: 'dateAdded', label: 'date added' },
          { value: 'dateGroupModified', label: 'date modified' },
        ]}
      />
      <TreeSelect
        showSearch
        style={{ width: 400 }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select bookmarks to be sorted"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={handleSelectBookmarks}
        treeData={treeData}
      />
      <Button type="primary">sort</Button>
    </div>
  )
}

export default App;