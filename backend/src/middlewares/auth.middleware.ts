import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';
import { config } from '../config';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Token de autenticación no proporcionado',
      });
    }

    const decoded = jwt.verify(token, config.jwt.secret) as {
      id: string;
      email: string;
      isAdmin: boolean;
    };

    req.user = decoded;
    next();
    return;
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Token inválido o expirado',
    });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Acceso denegado. Se requieren permisos de administrador',
    });
  }
  next();
  return;
};