'use client';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

// Node component for better performance
const Node = ({ position, size, color }) => {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.003;
      ref.current.rotation.y += 0.005;
    }
  });
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

// Connection line between nodes and mouse
const Connection = ({ start, end, color, width = 0.01 }) => {
  // Calculate the distance between points
  const distance = start.distanceTo(end);
  
  // Calculate midpoint for the line placement
  const midPoint = start.clone().add(end).multiplyScalar(0.5);
  
  // Calculate rotation to align with the connection
  const direction = end.clone().sub(start).normalize();
  const quaternion = new Vector3(0, 1, 0).cross(direction).normalize();
  const w = 1 + new Vector3(0, 1, 0).dot(direction);
  const rotation = [quaternion.x, quaternion.y, quaternion.z, w];
  
  return (
    <mesh position={midPoint.toArray()} quaternion={rotation}>
      <cylinderGeometry args={[width, width, distance, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
};

// Main component
const ConnectionWeb = ({ 
  nodeCount = 20, 
  maxDistance = 5, 
  colors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'] 
}) => {
  // Set up refs and state
  const mousePosition = useRef(new Vector3(0, 0, 0));
  const { viewport, camera } = useThree();
  
  // Generate random nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, () => ({
      position: new Vector3(
        (Math.random() - 0.5) * viewport.width * 1.5,
        (Math.random() - 0.5) * viewport.height * 1.5,
        (Math.random() - 2) * 3
      ),
      velocity: new Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.005
      ),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 0.03 + 0.01
    }));
  }, [nodeCount, viewport, colors]);

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates (-1 to 1)
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Project mouse position to 3D space
      const vector = new Vector3(x, y, 0.5);
      vector.unproject(camera);
      
      // Calculate direction from camera
      const dir = vector.sub(camera.position).normalize();
      
      // Calculate intersection with z-plane
      const distance = -camera.position.z / dir.z;
      mousePosition.current = camera.position.clone().add(dir.multiplyScalar(distance));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);

  // Update node positions on each frame
  useFrame(() => {
    nodes.forEach(node => {
      // Move node according to velocity
      node.position.add(node.velocity);
      
      // Bounce off boundaries
      if (Math.abs(node.position.x) > viewport.width) {
        node.velocity.x *= -1;
      }
      if (Math.abs(node.position.y) > viewport.height) {
        node.velocity.y *= -1;
      }
      if (Math.abs(node.position.z) > 3) {
        node.velocity.z *= -1;
      }
      
      // Attract to mouse position
      const toMouse = mousePosition.current.clone().sub(node.position);
      const distanceToMouse = toMouse.length();
      
      if (distanceToMouse < maxDistance) {
        const force = 0.0005 * (1 - distanceToMouse / maxDistance);
        node.velocity.add(toMouse.normalize().multiplyScalar(force));
      }
      
      // Limit velocity
      if (node.velocity.length() > 0.03) {
        node.velocity.normalize().multiplyScalar(0.03);
      }
    });
  });

  return (
    <group>
      {/* Render nodes */}
      {nodes.map((node, i) => (
        <Node
          key={`node-${i}`}
          position={node.position}
          size={node.size}
          color={node.color}
        />
      ))}
      
      {/* Render connections */}
      {nodes.map((node, i) => {
        const distance = node.position.distanceTo(mousePosition.current);
        if (distance < maxDistance) {
          return (
            <Connection
              key={`connection-${i}`}
              start={node.position}
              end={mousePosition.current}
              color={node.color}
              width={0.005 * (1 - distance / maxDistance) + 0.001}
            />
          );
        }
        return null;
      })}
      
      {/* Mouse cursor focal point */}
      <mesh position={mousePosition.current.toArray()}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

export default ConnectionWeb; 