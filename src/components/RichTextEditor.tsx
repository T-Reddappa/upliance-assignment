import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Container,
  Paper,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { saveUser } from "../features/userSlice";

const TextEditor = () => {
  const userData = useSelector((state: RootState) => state.userData.userInfo);
  const dispatch = useDispatch();
  console.log(userData, "editor");

  const initialContent = `
  <div class="user-data">
    <h3>User Information</h3>
    <p><strong>Name:</strong> ${userData.name}</p>
    <p><strong>Email:</strong> ${userData.email}</p>
    <p><strong>Phone:</strong> ${userData.phone}</p>
    <p><strong>Address:</strong> ${userData.address}</p>
  </div>
`;
  console.log(initialContent);

  const onUpdate = ({ editor }: { editor: any }) => {
    const html = editor.getHTML();
    console.log(html);
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(initialContent);
    }
  }, [userData]);

  if (!editor) {
    return null;
  }

  const toolbarControls = [
    {
      value: "bold",
      icon: <FormatBoldIcon />,
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      value: "italic",
      icon: <FormatItalicIcon />,
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      value: "underline",
      icon: <FormatUnderlinedIcon />,
      action: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      value: "bullet-list",
      icon: <FormatListBulletedIcon />,
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
  ];

  return (
    <div className=" border-gray-800 rounded-md shadow-xl">
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Rich Text Editor
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <ToggleButtonGroup
            size="small"
            value={toolbarControls
              .filter((control) => editor.isActive(control.value))
              .map((control) => control.value)}
          >
            {toolbarControls.map((control) => (
              <ToggleButton
                size="small"
                key={control.value}
                value={control.value}
                onClick={control.action}
                selected={editor.isActive(control.value)}
              >
                {control.icon}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            p: 2,
            minHeight: "150px",
            "& .ProseMirror": {
              outline: "none",
              height: "100%",
              minHeight: "150px",
              "p.is-editor-empty:first-child::before": {
                content: "attr(data-placeholder)",
                color: "#adb5bd",
                float: "left",
                height: 0,
                pointerEvents: "none",
              },
            },
          }}
        >
          <EditorContent editor={editor} spellCheck={false} />
        </Box>
      </Paper>
    </div>
  );
};

export default TextEditor;
