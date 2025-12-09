# Portfolio OS

A Windows 11-inspired portfolio website built with Next.js, featuring a desktop environment with interactive applications.

## Features

- 🖥️ Windows 11-style desktop interface
- 📁 File Explorer with hierarchical navigation
- 🎨 Interactive applications (Skills, Projects, About, Contact, Certifications)
- 🪟 Smart window management with cascade positioning
- 🎯 Start Menu with app launcher and system controls
- 📊 Categorized skills display with proficiency indicators
- 🏆 Project showcase with media galleries and video demos
- 🎨 Modern glassmorphism UI with dark theme

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd ap-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

Or use Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Manual Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

## Project Structure

```
ap-portfolio/
├── app/
│   ├── context/          # React context providers
│   ├── data/             # Resume data and filesystem structure
│   └── page.tsx          # Main page
├── components/
│   ├── apps/             # Application components
│   └── os/               # OS UI components (Desktop, Taskbar, Windows)
├── public/
│   └── assets/           # Static assets (images, resume PDF)
└── next.config.ts        # Next.js configuration
```

## Features Overview

### Desktop Environment
- Draggable windows with title bar controls
- Minimize, maximize, and close functionality
- Smart cascade positioning to prevent overlap
- Focus management and z-index handling

### Applications
- **Skills**: Categorized technical skills with proficiency bars
- **Projects**: Interactive project showcase with videos and images
- **About Me**: Personal information and professional summary
- **Contact**: Contact information with social links
- **Certifications**: Professional credentials and achievements

### Start Menu
- Quick access to all applications
- Reload functionality
- Shutdown with confirmation dialog

## Customization

### Update Personal Information

Edit `app/data/resume.ts` to update:
- Personal details
- Skills and proficiency levels
- Projects and achievements
- Education and certifications

### Modify Theme

Tailwind configuration can be customized in `tailwind.config.ts`.

### Add New Applications

1. Create component in `components/apps/`
2. Add to filesystem in `app/data/filesystem.ts`
3. Register handler in `components/os/FileExplorer.tsx`
4. Add to Start Menu in `components/os/StartMenu.tsx`

## License

MIT License - feel free to use this project for your own portfolio!

## Credits

Built by Aanand Pandit using Next.js and modern web technologies.
