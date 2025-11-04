# How to Contribute

Thank you for helping build ColorStackNYU's community resources! Contributing is simple and doesn't require any coding experience.

## Adding a Resource

We welcome resources that help our community learn and grow—whether it's interview prep guides, coursework references, career development tools, or technical tutorials.

### Steps to Contribute

1. **Open the resources file on GitHub**
   - Go to [`public/resources.json`](https://github.com/ColorStackNYU/ColorStackNYU-Website/blob/main/public/resources.json)

2. **Click the edit button**
   - Look for the pencil icon (✎) in the top-right corner of the file
   - You'll need a GitHub account to proceed (it's free!)

3. **Add your resource**
   - Find the `"resources"` array and add a new object with the following structure:

```json
{
  "id": "unique-id-here",
  "title": "Resource Title",
  "description": "A brief description of what this resource covers",
  "link": "https://example.com",
  "category": "Interview Prep",
  "dateAdded": "2025-11-04",
  "tags": ["optional", "tags"],
  "contributedBy": "Your Name"
}
```

### Required Fields

- **id**: A unique identifier (e.g., `"codesignal-prep"`)
- **title**: The name of the resource
- **description**: What the resource is and why it's helpful
- **link**: The URL to the resource
- **category**: Choose from:
  - Interview Prep
  - Coursework
  - Career Growth
  - Web Development
  - Mobile Development
  - Data Science
  - System Design
- **dateAdded**: Today's date in `YYYY-MM-DD` format

### Optional Fields

- **tags**: An array of search tags (e.g., `["algorithms", "python"]`)
- **contributedBy**: Your name to get credit in our community!

### Example

```json
{
  "id": "leetcode-patterns",
  "title": "Leetcode Patterns Guide",
  "description": "A comprehensive guide to common coding patterns used in technical interviews",
  "link": "https://example.com/patterns",
  "category": "Interview Prep",
  "dateAdded": "2025-11-04",
  "tags": ["leetcode", "algorithms"],
  "contributedBy": "Jane Smith"
}
```

4. **Create a pull request**
   - Scroll to the bottom of the page
   - Select **"Create a new branch for this commit and start a pull request"**
   - Give your pull request a clear title (e.g., "Add: Leetcode Patterns Guide")
   - Click **"Propose changes"**

5. **We'll review and merge!**
   - Our team will review your contribution and merge it
   - Your resource will appear on the Resources page for the community to discover

## Guidelines

✓ **Good resources:**
- Educational and informative
- Relevant to computer science, career growth, or professional development
- Free or openly available
- From reputable sources

✗ **Please avoid:**
- Spam or self-promotion
- Paywalled content (unless it's a well-known platform)
- Broken or outdated links

## Questions?

Feel free to open an issue on GitHub or reach out to the ColorStackNYU team. We're here to help!

---

**Thank you for contributing to ColorStackNYU! 💜**
