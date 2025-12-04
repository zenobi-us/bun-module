---
description: Test the OpenCode plugin generator end-to-end
---

# Testing the OpenCode Plugin Generator

Help the user test the plugin generator by:

1. **Verify Prerequisites**
   - Confirm Bun is installed: `bun --version`
   - Check git is configured: `git config user.name` and `git config user.email`
   - User has a test directory ready

2. **Clone and Setup**
   - Clone the template: `git clone https://github.com/zenobi-us/opencode-plugin-template.git test-plugin`
   - Change to directory: `cd test-plugin`

3. **Run Generator**
   - Execute: `bunx plop --plopfile ./plopfile.js`
   - Guide user through the prompts:
     - Plugin name (kebab-case)
     - Plugin description
     - Author name
     - Author email
     - Repository URL
     - GitHub organization/username

4. **Verification Checklist**

   **Files Generated:**
   - [ ] `package.json` exists at root
   - [ ] `src/index.ts` exists
   - [ ] `README.md` exists at root
   - [ ] `.github/workflows/` directory exists
   - [ ] All template files are present

   **Generator Cleanup:**
   - [ ] `template/` directory is removed
   - [ ] `plopfile.js` is removed
   - [ ] Old `.git/` is removed (fresh repo initialized)

   **Git Repository:**
   - [ ] New `.git/` directory created
   - [ ] On `main` branch: `git branch` shows `* main`
   - [ ] Initial commit exists: `git log --oneline`
   - [ ] Remote added: `git remote -v` shows origin

   **Package.json Values:**
   - [ ] `name` matches input (kebab-case)
   - [ ] `description` matches input
   - [ ] `author.name` matches input
   - [ ] `author.email` matches input
   - [ ] `repository.url` matches input

   **README.md Values:**
   - [ ] Plugin name appears in README
   - [ ] Author email is present
   - [ ] Description is included

   **Kebab-Case Conversion:**
   Test with different formats:
   - [ ] CamelCase input: `MyAwesomePlugin` → `my-awesome-plugin`
   - [ ] Spaces input: `My Awesome Plugin` → `my-awesome-plugin`
   - [ ] Underscores input: `my_awesome_plugin` → `my-awesome-plugin`
   - [ ] Mixed special chars: `My-Awesome_Plugin!!!` → `my-awesome-plugin`

5. **Build & Install**
   - [ ] `bun install` succeeds
   - [ ] `mise run build` succeeds
   - [ ] `mise run lint` succeeds
   - [ ] `mise run test` succeeds

6. **Results Report**
   - Document any failures or issues
   - Report success with generated plugin path
   - Provide next steps for development

Provide clear feedback on each step and help troubleshoot any failures.
