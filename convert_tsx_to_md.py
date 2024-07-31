import os
import re
import yaml

def convert_tsx_to_md(tsx_path, md_path):
    with open(tsx_path, 'r') as tsx_file:
        content = tsx_file.read()

    # Extract metadata
    metadata_match = re.search(r'export const metadata: ContentItem = ({[\s\S]*?});', content)
    if metadata_match:
        metadata_str = metadata_match.group(1)
        # Convert to valid JSON
        metadata_str = re.sub(r'(\w+):', r'"\1":', metadata_str)
        metadata_str = metadata_str.replace("'", '"')
        metadata = yaml.safe_load(metadata_str)
    else:
        metadata = {}

    # Extract content
    content_match = re.search(r'<article>([\s\S]*?)</article>', content)
    if content_match:
        article_content = content_match.group(1).strip()
    else:
        article_content = ""

    # Create markdown content
    md_content = "---\n"
    md_content += yaml.dump(metadata, default_flow_style=False)
    md_content += "---\n\n"
    md_content += f"# {metadata.get('title', '')}\n\n"
    md_content += article_content

    # Write to markdown file
    with open(md_path, 'w') as md_file:
        md_file.write(md_content)

def main():
    directory = 'content/writing/reviews'
    for filename in os.listdir(directory):
        if filename.endswith('.tsx'):
            tsx_path = os.path.join(directory, filename)
            md_path = os.path.join(directory, filename[:-4] + '.md')
            convert_tsx_to_md(tsx_path, md_path)
            print(f"Converted {filename} to {filename[:-4]}.md")

if __name__ == "__main__":
    main()