'use client';
import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import EditorJS from '@editorjs/editorjs';

interface EditorProps {}

const Editor: React.ForwardRefRenderFunction<EditorJS | null, EditorProps> = (
  props,
  componentRef,
) => {
  const ref = useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  async function initializeEditor() {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    // @ts-ignore
    const Header = (await import('@editorjs/header')).default;
    // @ts-ignore
    const Embed = (await import('@editorjs/embed')).default;
    // @ts-ignore
    const Table = (await import('@editorjs/table')).default;
    // @ts-ignore
    const List = (await import('@editorjs/list')).default;
    // @ts-ignore
    const Code = (await import('@editorjs/code')).default;
    // @ts-ignore
    const LinkTool = (await import('@editorjs/link')).default;
    // @ts-ignore
    const InlineCode = (await import('@editorjs/inline-code')).default;

    const body = {
      content: undefined,
    };

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = null;
      };
    }
  }, [isMounted]);

  useImperativeHandle(componentRef, () => ref.current as unknown as EditorJS);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="grid w-full gap-10">
      <div className="prose prose-stone mx-auto w-full">
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          Use{' '}
          <kbd className="rounded-md border bg-slate-50 px-1 text-xs uppercase">
            Tab
          </kbd>{' '}
          to open the command menu.
        </p>
      </div>
    </div>
  );
};

export default React.forwardRef(Editor);
