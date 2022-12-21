'use client';
import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useCallback,
} from 'react';
import EditorJS from '@editorjs/editorjs';
import { useImageUploadMutation } from '@api/files/hook/useImageUploadMutation';
import { isBrowser } from '@libs/browser-utils/dom';

interface EditorProps {
  onReady?: (editor: EditorJS) => void;
}

const Editor: React.ForwardRefRenderFunction<EditorJS | null, EditorProps> = (
  props,
  componentRef,
) => {
  const ref = useRef<EditorJS | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { mutateAsync } = useImageUploadMutation();

  const getUploadImageData = useCallback(
    async (file: File) => {
      try {
        if (!file) {
          throw new Error('No file');
        }

        const { result } = await mutateAsync({
          file,
          uploadType: 'IMAGE',
          mediaType: 'IMAGE',
        });

        const data = result.result;

        return {
          success: 1,
          file: {
            url: data.url,
          },
        };
      } catch (error) {
        return {
          success: 0,
          file: null,
        };
      }
    },
    [mutateAsync],
  );

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
    // @ts-ignore
    const ImageTool = (await import('@editorjs/image')).default;
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor;
          props.onReady?.(editor);
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: undefined,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              /**
               * Custom uploader
               */
              uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: File) {
                  return getUploadImageData(file).then((data) => {
                    return data;
                  });
                },
              },
            },
          },
        },
      });
    }
  }

  useEffect(() => {
    if (isBrowser) setIsMounted(true);
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

  useImperativeHandle(componentRef, () => {
    return ref.current as unknown as EditorJS;
  });

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
