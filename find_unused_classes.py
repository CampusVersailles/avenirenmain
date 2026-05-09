import re
import os
from pathlib import Path

def parse_css_classes(css_content):
    """Extract all CSS class names from CSS content, handling composed selectors.""""
    # Match CSS class names (including those in composed selectors)
    class_pattern = r'\b([a-z_][a-z0-9_]*)\b'  # Simple class name pattern
    # More robust: match all non-pseudo-class identifiers
    all_classes = set()
    for match in re.finditer(r'\b([a-z_][a-z0-9_]*)\b', css_content, re.IGNORECASE):
        class_name = match.group(1)
        # Filter out pseudo-classes and invalid names
        if class_name and class_name[0].islower() and len(class_name) > 0:
            all_classes.add(class_name.lower())
    return all_classes

def parse_tsx_imports(tsx_content):
    """Extract all CSS module class names imported in a TSX file.""""
    # Match CSS module class names imported via "import styles from './...module.css'"
    import_pattern = r'import\s+\w+\s+from\s+['"'\s]([^"'\s]+)\b'
    # Match CSS module class names used in JSX
    usage_pattern = r'\b([a-z_][a-z0-9_]*)\b'
    imports = set()
    usages = set()
    for match in re.finditer(import_pattern, tsx_content, re.IGNORECASE):
        # Extract the CSS module filename
        css_file = match.group(1)
        # Assume it's a CSS module (e.g., "Button.module.css")
        # We'll need to find the actual CSS content to parse it
        imports.add(css_file)
    for match in re.finditer(usage_pattern, tsx_content, re.IGNORECASE):
        class_name = match.group(1)
        if class_name and class_name[0].islower() and len(class_name) > 0:
            usages.add(class_name.lower())
    return imports, usages

def find_unused_in_module(css_path, tsx_path):
    """Find unused CSS classes in a CSS module file compared to its TSX usage.""""
    try:
        with open(css_path, 'r') as f:
            css_content = f.read()
        with open(tsx_path, 'r') as f:
            tsx_content = f.read()
    except Exception as e:
        print(f"Error reading files: {e}")
        return None, None, None
    
    declared = parse_css_classes(css_content)
    imports, usages = parse_tsx_imports(tsx_content)
    
    # For each CSS module imported, find its actual CSS file
    actual_css = set()
    for imp in imports:
        # Build the actual CSS file path
        css_file = imp
        # Remove the .module.css extension
        css_name = css_file.replace('.module.css', '').replace('.css', '')
        # Find the CSS file in the module directory
        module_dir = os.path.dirname(css_path)
        css_path_in_module = os.path.join(module_dir, css_name + '.module.css')
        if os.path.exists(css_path_in_module):
            actual_css.add(css_path_in_module)
        else:
            # Try without the .module.css suffix
            css_path_in_module = os.path.join(module_dir, css_name + '.css')
            if os.path.exists(css_path_in_module):
                actual_css.add(css_path_in_module)
    
    # Now parse all actual CSS files
    all_declared = set()
    all_used = set()
    for css_file in actual_css:
        with open(css_file, 'r') as f:
            content = f.read()
        all_declared.update(parse_css_classes(content))
    
    # Extract all used classes from the TSX
    for match in re.finditer(r'\b([a-z_][a-z0-9_]*)\b', tsx_content, re.IGNORECASE):
        class_name = match.group(1)
        if class_name and class_name[0].islower() and len(class_name) > 0:
            all_used.add(class_name.lower())
    
    unused = all_declared - all_used
    
    return {
        'css_file': css_path,
        'tsx_file': tsx_path,
        'declared': sorted(all_declared),
        'used': sorted(all_used),
        'unused': sorted(unused)
    }

def main():
    module_dir = Path('components/Ressources')
    for css_file in module_dir.glob('*.module.css'):
        tsx_file = css_file.with_suffix('.tsx')
        if tsx_file.exists():
            result = find_unused_in_module(css_file, tsx_file)
            if result:
                print(f"=== {result['css_file']} ===")
                print(f"Declared: {result['declared']}")
                print(f"Used: {result['used']}")
                print(f"Unused: {result['unused']}")
                print("---")

if __name__ == '__main__':
    main()
