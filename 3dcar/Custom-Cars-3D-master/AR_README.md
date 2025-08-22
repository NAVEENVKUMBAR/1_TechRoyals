# AR Car Viewer - Augmented Reality Experience

## Overview
The AR Car Viewer allows users to experience 3D car models in augmented reality using their mobile devices. Users can place multiple cars in their real-world environment, customize them, and interact with them.

## Features

### 🚗 Available Car Models
- **Mustang** - Classic American muscle car
- **BMW M8** - Luxury sports sedan
- **Porsche** - Premium sports car
- **Audi A8** - Executive luxury sedan
- **Benz** - Mercedes-Benz luxury vehicle
- **BMW E34** - Classic BMW model
- **Camaro** - Chevrolet muscle car
- **McLaren 720** - Supercar
- **Nissan** - Japanese sports car

### 🎯 AR Functionality
- **Hit Testing** - Place cars on real-world surfaces
- **Multi-Car Placement** - Place multiple cars simultaneously
- **Interactive Controls** - Remove individual cars or clear all
- **Real-time Rendering** - Smooth AR experience with proper lighting

### 📱 User Interface
- **Car Selector** - Choose from available car models
- **AR Button** - Start/stop AR sessions
- **Instructions** - Step-by-step guidance for first-time users
- **Help System** - Accessible help button for guidance

## Requirements

### Device Requirements
- **Mobile Device** - Smartphone or tablet with AR capabilities
- **AR Support** - WebXR AR support (ARKit for iOS, ARCore for Android)
- **Camera Access** - Permission to use device camera
- **Modern Browser** - Chrome, Safari, or Firefox with WebXR support

### Technical Requirements
- **HTTPS Connection** - Required for WebXR functionality
- **Secure Context** - Localhost development is supported
- **WebGL Support** - Hardware-accelerated 3D graphics

## How to Use

### 1. Access the AR Experience
- Navigate to `/ar` route in your application
- Or click "AR Experience" in the navigation bar

### 2. Start AR Session
- Click the blue "AR" button in the top-right corner
- Grant camera permissions when prompted
- Wait for AR session to initialize

### 3. Place Cars
- Point your camera at a flat surface (table, floor, etc.)
- Look for the white reticle (target indicator)
- Tap the screen to place a car at that location
- Cars will appear with random rotation for variety

### 4. Customize Experience
- Use the car selector at the bottom to choose different models
- Each car model has unique colors and characteristics
- Place multiple cars to create a car showroom effect

### 5. Manage Cars
- **Remove Individual Car**: Tap the red sphere above any car
- **Clear All Cars**: Use the red button in the distance
- **Reset Session**: Exit and restart AR to begin fresh

## Technical Implementation

### Core Components
- **ARScene.jsx** - Main AR scene container and setup
- **ARCarSelector.jsx** - Car model selection interface
- **ARCarPlacement.jsx** - Car placement and interaction logic
- **ARInstructions.jsx** - User guidance system

### Technologies Used
- **@react-three/xr** - WebXR integration for React Three.js
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and components
- **Three.js** - 3D graphics library

### AR Session Configuration
```javascript
sessionInit={{
  requiredFeatures: ['hit-test'],
  optionalFeatures: ['dom-overlay', 'local-floor', 'bounded-floor'],
  domOverlay: { root: document.body }
}}
```

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access AR page at http://localhost:3000/ar
```

### Building for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Testing AR Functionality
1. Use HTTPS or localhost for development
2. Test on mobile devices or AR-capable browsers
3. Ensure camera permissions are granted
4. Test hit testing on various surfaces

## Troubleshooting

### Common Issues

#### AR Button Not Appearing
- Check if device supports WebXR AR
- Ensure HTTPS connection or localhost
- Verify browser compatibility

#### Hit Testing Not Working
- Point camera at flat, textured surfaces
- Ensure good lighting conditions
- Check camera permissions

#### Performance Issues
- Close other AR applications
- Reduce number of placed cars
- Ensure device has sufficient processing power

#### Cars Not Placing
- Verify AR session is active
- Check if reticle is visible
- Ensure surface detection is working

### Browser Compatibility
- **Chrome (Android)**: Full AR support with ARCore
- **Safari (iOS)**: Full AR support with ARKit
- **Firefox**: Limited AR support
- **Edge**: Limited AR support

## Future Enhancements

### Planned Features
- **Car Customization** - Color and material options
- **Physics Integration** - Realistic car movement
- **Multi-User AR** - Shared AR experiences
- **Car Animations** - Engine sounds, lights, etc.
- **Environment Mapping** - Better surface detection

### Performance Optimizations
- **Level of Detail** - Adaptive model complexity
- **Texture Compression** - Optimized asset loading
- **Culling** - Only render visible cars
- **Memory Management** - Efficient resource usage

## Support

For technical support or feature requests:
- Check browser console for error messages
- Verify device compatibility
- Test on different surfaces and lighting conditions
- Ensure all dependencies are properly installed

## License

This AR functionality is part of the 3D Car project and follows the same licensing terms.
