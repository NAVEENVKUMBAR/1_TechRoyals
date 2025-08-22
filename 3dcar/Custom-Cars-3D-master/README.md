# 🚗 **CustomCars3D - Interactive 3D Car Viewer & AR Experience**

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-green)](https://threejs.org/)
[![AR Ready](https://img.shields.io/badge/AR-Ready-orange)](https://webxr.dev/)

> **An immersive 3D car customization platform with Augmented Reality support, featuring 11 high-quality car models with real-time customization and AR viewing capabilities.**

---

## ✨ **Features**

### 🎨 **3D Car Customization**
- **11 Premium Car Models** - Mustang, BMW M8, Porsche, Audi A8, Mercedes-Benz, BMW E34, Camaro, McLaren 720S, Nissan, and more
- **Real-time Color Customization** - Body, accessories, and rims
- **Material Wraps** - 10+ texture options including galaxy patterns
- **Interactive 3D Controls** - Orbit, zoom, and rotate

### 📱 **Augmented Reality (AR)**
- **WebXR AR Experience** - Native browser AR support
- **Model Viewer AR** - Google's AR viewer for mobile devices
- **Mobile Optimized** - Touch-friendly AR controls
- **Cross-platform Support** - iOS Safari, Android Chrome, Edge

### 🎯 **Responsive Design**
- **Mobile First** - Optimized for all screen sizes
- **Touch Controls** - Mobile-friendly interactions
- **Adaptive Layout** - Collapsible sidebar, responsive grids
- **Performance Optimized** - Fast loading and smooth animations

### 📥 **Download & Export**
- **3D Model Downloads** - Save GLTF files locally
- **High-quality Assets** - Professional-grade 3D models
- **Multiple Formats** - GLTF/GLB support

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Modern browser with WebGL support

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/CustomCars3D.git
cd CustomCars3D

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Access the Application**
- **Main App**: http://localhost:3000
- **WebXR AR**: http://localhost:3000/ar
- **Model Viewer AR**: http://localhost:3000/ar/model-viewer

---

## 🎮 **How to Use**

### **3D Car Viewer**
1. **Select a Car** - Choose from 11 available models in the sidebar
2. **Customize Colors** - Use color pickers for body, accessories, and rims
3. **Apply Materials** - Select from 10+ texture wraps
4. **Interact** - Orbit, zoom, and rotate the 3D model
5. **Download** - Save the 3D model as GLTF file

### **AR Experience**
1. **Navigate to AR** - Click "Experience in AR" button
2. **Choose AR Type**:
   - **WebXR AR** - For supported browsers/devices
   - **Model Viewer AR** - For mobile AR viewing
3. **Place in AR** - Tap "View in your space" and point camera
4. **Interact** - Move around to view from different angles

### **Mobile Experience**
- **Hamburger Menu** - Tap to open car selection
- **Touch Controls** - Swipe to rotate, pinch to zoom
- **AR Ready** - Optimized for mobile AR experiences

---

## 🏗️ **Project Structure**

```
CustomCars3D/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with context
│   ├── page.jsx           # Main 3D viewer page
│   ├── globals.css        # Global styles
│   └── ar/                # AR pages
│       ├── page.jsx       # WebXR AR
│       └── model-viewer/  # Model Viewer AR
├── components/            # React components
│   ├── AllCars.jsx       # Car selection grid
│   ├── CarThumbnail.jsx  # Car preview cards
│   ├── Mustang.jsx       # Individual car models
│   ├── BmwM8.jsx         # (and 9 more car components)
│   └── UniversalMaterialWrapper.jsx # Material system
├── public/               # Static assets
│   ├── mustang.gltf      # 3D models (11 files)
│   ├── material1.png     # Textures (10+ files)
│   └── textures/         # Additional assets
├── lib/                  # Utilities
└── docs/                 # Documentation
```

---

## 🛠️ **Technology Stack**

### **Frontend**
- **Next.js 14.1.0** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type safety (partial)

### **3D Graphics**
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Three.js helpers and components

### **AR Implementation**
- **WebXR API** - Browser-based AR
- **Google Model Viewer** - AR model viewing component
- **AR.js** - Alternative AR library (explored)

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Custom Components** - Tailored UI components

---

## 📱 **Browser Support**

### **3D Viewer**
- ✅ Chrome 79+
- ✅ Firefox 72+
- ✅ Safari 13.1+
- ✅ Edge 79+

### **AR Features**
- ✅ Chrome 79+ (Android)
- ✅ Safari 13.1+ (iOS)
- ✅ Edge 79+ (Windows)
- ❌ Firefox (limited AR support)

### **Mobile AR**
- ✅ iOS Safari 13.1+
- ✅ Android Chrome 79+
- ✅ Samsung Internet 11.1+

---

## 🎨 **Customization Options**

### **Available Cars**
1. **Mustang** - American muscle car
2. **BMW M8** - German luxury sports car
3. **Porsche** - Premium sports car
4. **Audi A8** - Luxury sedan
5. **Mercedes-Benz** - Premium sedan
6. **BMW E34** - Classic BMW
7. **Camaro** - American sports car
8. **McLaren 720S** - Supercar
9. **Nissan** - Japanese sports car
10. **Generic Car** - Universal model
11. **Simple Car** - Basic model

### **Material Wraps**
- **Default Paint** - Original car colors
- **Red Texture** - Vibrant red finish
- **Blue Texture** - Deep blue finish
- **Yellow Texture** - Bright yellow finish
- **Silver Texture** - Metallic silver
- **Black Texture** - Matte black
- **White Texture** - Clean white
- **Orange Texture** - Dynamic orange
- **Galaxy Pattern** - Space-themed wrap
- **Additional Textures** - Various patterns

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Netlify**
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'out' folder
```

### **Static Export**
```bash
# Build for static export
npm run build
npm run export

# Serve static files
npx serve out
```

---

## 🔧 **Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run export       # Export static files
```

### **Environment Variables**
```env
# Optional: Add to .env.local
NEXT_PUBLIC_APP_NAME=CustomCars3D
NEXT_PUBLIC_VERSION=1.0.0
```

---

## 📊 **Performance**

### **Optimizations**
- **Lazy Loading** - Components load on demand
- **Image Optimization** - Next.js automatic optimization
- **Code Splitting** - Automatic bundle splitting
- **3D Model Optimization** - Compressed GLTF files
- **Responsive Images** - Adaptive image sizing

### **Metrics**
- **First Load JS**: ~500KB
- **3D Model Size**: 2-5MB per model
- **Loading Time**: <3 seconds
- **AR Initialization**: <5 seconds

---

## 🤝 **Contributing**

### **How to Contribute**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow React best practices
- Use TypeScript for new components
- Maintain responsive design
- Test on multiple devices
- Update documentation

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Three.js Community** - 3D graphics library
- **React Three Fiber** - React integration
- **Google Model Viewer** - AR component
- **Next.js Team** - React framework
- **Tailwind CSS** - Styling framework

---

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/yourusername/CustomCars3D/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/CustomCars3D/discussions)
- **Email**: your.email@example.com

---

## 🌟 **Star History**

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/CustomCars3D&type=Date)](https://star-history.com/#yourusername/CustomCars3D&Date)

---

**Made with ❤️ by Team Tech Royals**

*Experience the future of car customization with CustomCars3D! 🚗✨*


