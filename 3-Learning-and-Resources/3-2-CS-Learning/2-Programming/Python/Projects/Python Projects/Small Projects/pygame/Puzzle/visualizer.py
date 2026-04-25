import time
import pygame


class Visualizer:
    BLACK = (0, 0, 0)
    GREEN = (0, 255, 0)
    SCALE = 16

    def __init__(self):
        pygame.init()
        self.gameDisplay = pygame.display.set_mode((56 * Visualizer.SCALE, 56 * Visualizer.SCALE))


    def visualize(self, positions):
        self.gameDisplay.fill(Visualizer.BLACK)

        for tup in positions:
            piece, position = tup
            piece = (Visualizer.SCALE * piece[0], Visualizer.SCALE * piece[1])
            position = (Visualizer.SCALE * position[0], Visualizer.SCALE * position[1])

            border = 5
            pygame.draw.polygon(self.gameDisplay, Visualizer.GREEN, (position, (position[0] + piece[0], position[1]), (position[0] + piece[0], position[1] + piece[1]), (position[0], position[1] + piece[1])))
            pygame.draw.polygon(self.gameDisplay, Visualizer.BLACK, ((position[0] + border, position[1] + border), (position[0] + piece[0] - border, position[1] + border), (position[0] + piece[0] - border, position[1] + piece[1] - border), (position[0] + border, position[1] + piece[1] - border)))

        pygame.display.update()
        time.sleep(.01)
