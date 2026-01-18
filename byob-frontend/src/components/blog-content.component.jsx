const BlogContent = ({ block }) => {
    
        // switch (block.type) {
        //   // case 'header':
            
        //   //   const HeaderTag = `h${block.data.level || 1}`; 
        //   //   return <HeaderTag key={block.id}>{block.data.text}</HeaderTag>;
            
        //   case 'paragraph':
        //     return <p className="my-4 mx-auto max-w-4xl font-serif text-gray-700 dark:text-gray-600 leading-relaxed" key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }} />;
        //     case 'image':
        //     return <img key={block.id} src={block.data.file.url} alt={block.data.caption} className="my-4 mx-auto" />;
         
        //   default:
        //     return null;
        // }

        let { type, data } = block;

        if (type === 'paragraph') {
            return <p className="my-4 mx-auto max-w-4xl font-serif text-gray-700 dark:text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.text }} />;
        } else if (type === 'image') {
            return <img src={data.file.url} alt={data.caption} className="my-4 mx-auto" />;
        } else if (type === 'header') {
            const HeaderTag = `h${data.level || 1}`; 
            return <HeaderTag className="my-6 mx-auto max-w-4xl font-serif text-gray-800 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: data.text }} />;
        }else if (type === 'quote') {
            return <blockquote className="my-6 mx-auto max-w-4xl bg-gray-100 italic font-serif text-gray-600 dark:text-gray-500 border-l-4 pl-4" dangerouslySetInnerHTML={{ __html: data.text }} />;
        } else if (type === 'list') {
            const ListTag = data.style === 'ordered' ? 'ol' : 'ul';
            return <ListTag className="my-4 mx-auto max-w-4xl list-inside list-disc font-serif text-gray-700 dark:text-gray-600" dangerouslySetInnerHTML={{ __html: data.items.map(item => `<li>${item}</li>`).join('') }} />;
        }
}

export default BlogContent;